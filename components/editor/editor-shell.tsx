"use client";

import { useRef, useState } from "react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

interface EditorShellProps {
  children: React.ReactNode;
}

export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    toggleButtonRef.current?.focus();
  };

  return (
    <div className="flex flex-1 flex-col">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        toggleButtonRef={toggleButtonRef}
      />
      <div className="relative flex-1 overflow-hidden">
        <ProjectSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {children}
      </div>
    </div>
  );
}
