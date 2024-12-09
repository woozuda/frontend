"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const SharedDrawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
SharedDrawer.displayName = "SharedDrawer"

const SharedDrawerTrigger = DrawerPrimitive.Trigger

const SharedDrawerPortal = DrawerPrimitive.Portal

const SharedDrawerClose = DrawerPrimitive.Close

const SharedDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(() => null);
// const SharedDrawerOverlay = React.forwardRef<
//   React.ElementRef<typeof DrawerPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
// >(({ className, ...props }, ref) => (
//   <DrawerPrimitive.Overlay
//     ref={ref}
//     className={cn("fixed inset-0 z-50 bg-black/80", className)}
//     {...props}
//   />
// ))
SharedDrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const SharedDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SharedDrawerPortal>
    {/* <SharedDrawerOverlay /> */}
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-black" />
      {children}
    </DrawerPrimitive.Content>
  </SharedDrawerPortal>
))
SharedDrawerContent.displayName = "SharedDrawerContent"

const SharedDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
SharedDrawerHeader.displayName = "SharedDrawerHeader"

const SharedDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
SharedDrawerFooter.displayName = "SharedDrawerFooter"

const SharedDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
SharedDrawerTitle.displayName = DrawerPrimitive.Title.displayName

const SharedDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SharedDrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  SharedDrawer,
  SharedDrawerPortal,
  // SharedDrawerOverlay,
  SharedDrawerTrigger,
  SharedDrawerClose,
  SharedDrawerContent,
  SharedDrawerHeader,
  SharedDrawerFooter,
  SharedDrawerTitle,
  SharedDrawerDescription,
}
