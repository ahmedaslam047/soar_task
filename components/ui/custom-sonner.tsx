import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-white',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-white',
          success:
            'group-[.toaster]:bg-green-500 group-[.toaster]:text-white group-[.toaster]:border-green-600',
          error:
            'group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-red-600',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
