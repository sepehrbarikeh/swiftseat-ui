"use client";

import { useMemo, useState } from "react";
import type { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  AdminGetEvents,
  CreateEvent,
  UpdateEvent,
  DeleteEvent,
  CheckTicket,
  ChangeUserRole,
} from "@/src/service/admin";
import { Concert, Events } from "@/src/types/concert";
import { CreateEventType } from "@/src/types/admin";

function getErrorMessage(err: unknown) {
  if (!err) return 'Request failed';
  if (typeof err === 'string') return err;
  if (typeof err === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyErr = err as any;
    if (anyErr?.response?.data?.message) return anyErr.response.data.message;
    if (typeof anyErr.message === 'string') return anyErr.message;
  }
  return 'Request failed';
}

function toDatetimeLocal(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function Page() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedEvent, setSelectedEvent] = useState<Concert | null>(null);
  const [formValues, setFormValues] = useState<Partial<CreateEventType>>({
    title: "",
    description: "",
    location: "",
    start_time: "",
    rows: 1,
    seats_per_row: 1,
    image: undefined,
  });
  const [ticketRef, setTicketRef] = useState("");
  const [ticketResult, setTicketResult] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("user");

  const { data, isLoading, error, refetch } = useQuery<Events, unknown, Events>({
    queryKey: ["admin-events", page, limit],
    queryFn: async () => {
      const res = (await AdminGetEvents({ page, limit })) as AxiosResponse<{ data: Events }>;
      return (res.data?.data ?? res.data) as Events;
    },
  });

  const events = useMemo(() => data?.events ?? [], [data]);
  const totalPages = data?.total_pages ?? 1;

  const createMutation = useMutation<unknown, unknown, FormData>({
    mutationFn: (payload) => CreateEvent(payload),
    onSuccess: () => {
      toast.success("Event created successfully");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["admin-events", page, limit] });
    },
    onError: (err: unknown) => {
      console.error('create event error', err);
      toast.error(getErrorMessage(err));
    },
  });

  const updateMutation = useMutation<unknown, unknown, { id: number; payload: FormData }>({
    mutationFn: ({ id, payload }) => UpdateEvent(String(id), payload),
    onSuccess: () => {
      toast.success("Event updated successfully");
      setSelectedEvent(null);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["admin-events", page, limit] });
    },
    onError: (err: unknown) => {
      console.error('update event error', err);
      toast.error(getErrorMessage(err));
    },
  });

  const deleteMutation = useMutation<unknown, unknown, number>({
    mutationFn: (id: number) => DeleteEvent(String(id)),
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });

  const ticketMutation = useMutation<AxiosResponse<{ data: unknown }>, unknown, string>({
    mutationFn: (ref: string) => CheckTicket(ref),
    onSuccess: (res) => {
      const payload = res.data?.data ?? res.data;
      setTicketResult(JSON.stringify(payload, null, 2));
      toast.success("Ticket checked successfully");
    },
    onError: () => {
      setTicketResult(null);
      toast.error("Ticket validation failed");
    },
  });

  const roleMutation = useMutation<unknown, unknown, { id: string; role: string }>({
    mutationFn: ({ id, role }) => ChangeUserRole(id, { role }),
    onSuccess: () => {
      toast.success("User role updated successfully");
      setUserId("");
      setUserRole("user");
    },
    onError: () => {
      toast.error("Failed to update user role");
    },
  });

  function resetForm() {
    setFormValues({
      title: "",
      description: "",
      location: "",
      start_time: "",
      rows: 1,
      seats_per_row: 1,
      image: undefined,
    });
  }

  const handleInputChange = (field: keyof CreateEventType, value: string | number | File | undefined) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (event: Concert) => {
    setSelectedEvent(event);
    setFormValues({
      title: event.title,
      description: event.description,
      location: event.location,
      start_time: toDatetimeLocal(event.start_time),
      rows: 1,
      seats_per_row: event.total_seats || 1,
      image: undefined,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValues.title || !formValues.description || !formValues.location || !formValues.start_time) {
      toast.error("Please complete all event fields.");
      return;
    }

    const payload = new FormData();
    payload.append("title", String(formValues.title));
    payload.append("description", String(formValues.description));
    payload.append("location", String(formValues.location));
    const startDate = new Date(String(formValues.start_time));
    if (Number.isNaN(startDate.getTime())) {
      toast.error("Invalid start time format.");
      return;
    }
    payload.append("start_time", startDate.toISOString());
    const rows = Number(formValues.rows || 1);
    const seatsPerRow = Number(formValues.seats_per_row || 1);
    payload.append("rows", String(rows));
    payload.append("seats_per_row", String(seatsPerRow));
    payload.append("total_seats", String(rows * seatsPerRow));
    if (formValues.image instanceof File) {
      payload.append("image", formValues.image);
    }

    // Log FormData entries for debugging server "invalid data format" errors
    logFormData(payload);

    if (selectedEvent) {
      updateMutation.mutate({ id: selectedEvent.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  function logFormData(fd: FormData) {
    try {
      const entries: Array<{ key: string; valueType: string; valuePreview: string }> = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const [k, v] of (fd as any).entries()) {
        let valueType: string = typeof v;
        let preview = '';
        if (v instanceof File) {
          valueType = 'file';
          preview = `${v.name} (${v.type}; ${v.size} bytes)`;
        } else if (v === null) {
          preview = 'null';
        } else if (v === undefined) {
          preview = 'undefined';
        } else {
          preview = String(v).slice(0, 200);
        }
        entries.push({ key: k, valueType, valuePreview: preview });
      }
      // Print a concise table to the console
      console.groupCollapsed('FormData payload');
      for (const e of entries) console.log(e.key, e.valueType, e.valuePreview);
      console.groupEnd();
    } catch {
      // Fallback simple log
      console.log('FormData', fd);
    }
  }

  const renderEventRows = () =>
    events.map((event) => (
      <div
        key={event.id}
        className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Event #{event.id}
            </span>
            <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">{event.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            <span>{event.location}</span>
            <span>Starts: {new Date(event.start_time).toLocaleString()}</span>
            <span>{event.available_seats} seats available</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 sm:w-52">
          <button
            type="button"
            onClick={() => handleEdit(event)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteMutation.mutate(event.id)}
            disabled={deleteMutation.status === "pending"}
            className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen mt-24 bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">Manage events, tickets, and user roles from one place.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Refresh events
            </button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[2fr_1.2fr]">
          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Events</h2>
                <p className="text-sm text-slate-600">Paginated event list from the admin endpoint.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm text-slate-700">Limit:</label>
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                >
                  {[10, 20, 50].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center text-slate-500">Loading events...</div>
            ) : error ? (
              <div className="py-20 text-center text-red-600">Failed to load events.</div>
            ) : events.length === 0 ? (
              <div className="py-20 text-center text-slate-500">No events found.</div>
            ) : (
              <div className="space-y-4">{renderEventRows()}</div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
              <span className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Create / Update Event</h2>
              <p className="text-sm text-slate-600">Fill the form and submit to create or update an event.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Title
                  <input
                    value={formValues.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Location
                  <input
                    value={formValues.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Start time
                  <input
                    type="datetime-local"
                    value={formValues.start_time || ""}
                    onChange={(e) => handleInputChange("start_time", e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange("image", e.target.files?.[0])}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Description
                <textarea
                  value={formValues.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Rows
                  <input
                    type="number"
                    min={1}
                    value={formValues.rows ?? 1}
                    onChange={(e) => handleInputChange("rows", Number(e.target.value))}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Seats per row
                  <input
                    type="number"
                    min={1}
                    value={formValues.seats_per_row ?? 1}
                    onChange={(e) => handleInputChange("seats_per_row", Number(e.target.value))}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={createMutation.status === "pending" || updateMutation.status === "pending"}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {selectedEvent ? "Update Event" : "Create Event"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent(null);
                    resetForm();
                  }}
                  className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </form>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-900">Ticket Validation</h3>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={ticketRef}
                  onChange={(e) => setTicketRef(e.target.value)}
                  placeholder="Ticket reference"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => ticketMutation.mutate(ticketRef)}
                  disabled={!ticketRef}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Check Ticket
                </button>
              </div>
              {ticketResult && (
                <pre className="mt-4 max-h-40 overflow-auto rounded-2xl bg-slate-900 p-4 text-sm text-slate-100">
                  {ticketResult}
                </pre>
              )}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-900">Change User Role</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="User ID"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  type="button"
                  onClick={() => roleMutation.mutate({ id: userId, role: userRole })}
                  disabled={!userId}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Update Role
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
