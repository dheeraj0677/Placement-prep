'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Domain } from '@/types/database';

interface DomainContextType {
  domain: Domain;
  setDomain: (domain: Domain) => void;
  toggleDomain: () => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (val: boolean) => void;
  isBranchModalOpen: boolean;
  openBranchModal: () => void;
  closeBranchModal: () => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

const DOMAIN_STORAGE_KEY = 'placementprep_selected_domain';
const ONBOARDED_STORAGE_KEY = 'placementprep_domain_onboarded';

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [domain, setDomainState] = useState<Domain>('it');
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedDomain = localStorage.getItem(DOMAIN_STORAGE_KEY) as Domain | null;
      const onboarded = localStorage.getItem(ONBOARDED_STORAGE_KEY);

      if (storedDomain === 'it' || storedDomain === 'ece') {
        setDomainState(storedDomain);
      }
    } catch {
      // Ignore localStorage errors in SSR/incognito
    }
  }, []);

  const setDomain = (newDomain: Domain) => {
    setDomainState(newDomain);
    try {
      localStorage.setItem(DOMAIN_STORAGE_KEY, newDomain);
      localStorage.setItem(ONBOARDED_STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
    setIsFirstVisit(false);
    setIsBranchModalOpen(false);
  };

  const toggleDomain = () => {
    const nextDomain = domain === 'it' ? 'ece' : 'it';
    setDomain(nextDomain);
  };

  const openBranchModal = () => setIsBranchModalOpen(true);
  const closeBranchModal = () => setIsBranchModalOpen(false);

  return (
    <DomainContext.Provider
      value={{
        domain,
        setDomain,
        toggleDomain,
        isFirstVisit,
        setIsFirstVisit,
        isBranchModalOpen,
        openBranchModal,
        closeBranchModal,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain(): DomainContextType {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
}
