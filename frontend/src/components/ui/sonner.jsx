import { Toaster as Sonner } from "sonner"

function Toaster({ ...props }) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900 group-[.toaster]:text-zinc-100 group-[.toaster]:border-zinc-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-zinc-400",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400",
          success: "group-[.toaster]:!bg-emerald-950/80 group-[.toaster]:!border-emerald-800/50 group-[.toaster]:!text-emerald-200",
          error: "group-[.toaster]:!bg-rose-950/80 group-[.toaster]:!border-rose-800/50 group-[.toaster]:!text-rose-200",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
