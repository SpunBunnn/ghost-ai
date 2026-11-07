"use client";

import { UserButton } from "@clerk/nextjs";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  toggleButtonRef?: React.Ref<HTMLButtonElement>;
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  toggleButtonRef,
}: EditorNavbarProps) {
  return (
    <nav className="flex h-12 shrink-0 items-center border-b border-border bg-card px-3">
      <div className="flex flex-1 items-center justify-start">
        <Button
          ref={toggleButtonRef}
          variant="ghost"
          size="icon-sm"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="text-muted-foreground" />
          ) : (
            <PanelLeftOpen className="text-muted-foreground" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center" />
      <div className="flex flex-1 items-center justify-end">
        <UserButton />
      </div>
    </nav>
  );
}
