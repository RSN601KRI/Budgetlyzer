
import * as React from "react"
import {
  ChevronsLeft,
  ChevronsRight,
  Menu,
  Laptop,
  MoonStar,
  Sun,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { NavLink } from "react-router-dom"
import { useTheme } from "@/hooks/useTheme"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher"

export const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}>({
  collapsed: false,
  setCollapsed: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { collapsed, setCollapsed } = useSidebar()
  const isMobile = useMobile()

  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true)
    }
  }, [isMobile, setCollapsed])

  return (
    <aside
      className={cn(
        "fixed left-0 z-10 flex h-screen flex-col border-r bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-60"
      )}
    >
      <div className="flex h-[52px] items-center border-b px-3">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
        {!collapsed && (
          <h2 className="pl-2 text-lg font-semibold">BudgetMaster</h2>
        )}
      </div>
      {children}
    </aside>
  )
}

export function SidebarHeader({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const { collapsed } = useSidebar()

  return (
    <div
      className={cn(
        "flex h-[52px] items-center border-b px-4",
        collapsed && "justify-center px-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("flex-1 overflow-auto", className)}>{children}</div>
}

export function SidebarFooter({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const { collapsed } = useSidebar()
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn(
        "flex border-t p-3",
        collapsed ? "flex-col items-center gap-3" : "items-center justify-between",
        className
      )}
    >
      {!collapsed && children ? (
        children
      ) : (
        <ThemeSwitcher />
      )}
    </div>
  )
}

export function SidebarGroup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("flex flex-col p-2", className)}>{children}</div>
}

export function SidebarGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { collapsed } = useSidebar()

  if (collapsed) return null

  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-medium tracking-tight text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarGroupContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenu({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("my-1", className)}>{children}</div>
}

export function SidebarMenuLinkItem({
  to,
  icon,
  title,
  external,
  badge,
}: {
  to: string
  icon: LucideIcon
  title: string
  external?: boolean
  badge?: React.ReactNode
}) {
  const { collapsed } = useSidebar()
  const Icon = icon

  const link = (
    <div
      className={cn(
        "group flex w-full cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-accent",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 text-muted-foreground group-hover:text-foreground"
        )}
      />
      {!collapsed && <span className="px-2">{title}</span>}
      {!collapsed && badge && (
        <div className="ml-auto">{badge}</div>
      )}
    </div>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {external ? (
            <a
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {link}
            </a>
          ) : (
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "block",
                  isActive &&
                    "bg-accent"
                )
              }
            >
              {link}
            </NavLink>
          )}
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    )
  }

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="block">
        {link}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "block",
          isActive && "bg-accent text-foreground"
        )
      }
    >
      {link}
    </NavLink>
  )
}

export function SidebarMenuButton({
  children,
  className,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}) {
  const { collapsed } = useSidebar()
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp
      className={cn(
        "group flex w-full cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-accent",
        collapsed && "justify-center px-0",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarTrigger() {
  const { setCollapsed } = useSidebar()

  return (
    <Button
      variant="ghost"
      className="h-8 w-8 p-0 md:hidden"
      onClick={() => setCollapsed(false)}
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
