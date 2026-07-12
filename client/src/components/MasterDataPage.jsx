import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

/**
 * Generic list + create/edit/delete UI for simple master-data resources
 * (Categories, Vendors, Branches, Locations). Each of those pages just
 * supplies its crudApi, queryKey, columns, and form fields.
 */
const MasterDataPage = ({ title, crudApi, queryKey, columns, fields, emptyDefaults }) => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, search],
    queryFn: () => crudApi.list({ search, limit: 50 })
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: emptyDefaults
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: [queryKey] });

  const createMutation = useMutation({
    mutationFn: crudApi.create,
    onSuccess: () => {
      toast.success(`${title} created`);
      invalidate();
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || "Create failed")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => crudApi.update(id, payload),
    onSuccess: () => {
      toast.success(`${title} updated`);
      invalidate();
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || "Update failed")
  });

  const deleteMutation = useMutation({
    mutationFn: crudApi.remove,
    onSuccess: () => {
      toast.success(`${title} deleted`);
      invalidate();
    },
    onError: (error) => toast.error(error.response?.data?.message || "Delete failed")
  });

  const openCreateModal = () => {
    setEditing(null);
    reset(emptyDefaults);
    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditing(record);
    reset(record);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    reset(emptyDefaults);
  };

  const onSubmit = (values) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, payload: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const rows = data?.data || [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
          <p className="text-sm text-slate-400">{data?.pagination?.total ?? 0} records</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary">
          <Plus size={16} /> Add {title.slice(0, -1)}
        </button>
      </div>

      <div className="card mb-4 p-3">
        <input
          className="input"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase text-slate-400 dark:border-slate-800">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            )}

            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-slate-400">
                  No records found
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-700 dark:text-slate-200">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(row)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(row.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="card w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {editing ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="label">{field.label}</label>
                  {field.type === "select" ? (
                    <select className="input" {...register(field.name, { required: field.required })}>
                      <option value="">Select...</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      className="input"
                      {...register(field.name, { required: field.required })}
                    />
                  )}
                </div>
              ))}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {editing ? "Save Changes" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterDataPage;
