"use client";
import { createContext, useRef, MutableRefObject, RefObject } from "react";

interface SectionRefs {
  section1: RefObject<HTMLDivElement>;
  section2: RefObject<HTMLDivElement>;
  section3: RefObject<HTMLDivElement>;
}

export const SectionContext = createContext<SectionRefs>({
  section1: { current: null },
  section2: { current: null },
  section3: { current: null },
});

export const SectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);

  return (
    <SectionContext.Provider
      value={{
        section1,
        section2,
        section3,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
