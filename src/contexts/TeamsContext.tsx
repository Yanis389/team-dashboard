import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import { Member, Team } from '../types';

interface TeamsContextType {
  allTeams: Team[];
  paginatedTeams: Team[];
  allMembers: Member[];
  fetchTeams: () => Promise<void>;
  fetchMembers: () => Promise<void>;
  assignMemberToTeam: (teamId: number, memberId: number) => void;
  removeMemberFromTeam: (teamId: number, memberId: number) => void;
  setSortBy: (key: 'title' | 'assignedCount') => void;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

export const TeamsContext = createContext<TeamsContextType>({} as TeamsContextType);

export const TeamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [paginatedTeams, setPaginatedTeams] = useState<Team[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [sortBy, setSortByState] = useState<'title' | 'assignedCount'>('title');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const fetchTeams = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    const formatted = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      assignedMemberIds: [] as number[],
    }));
    setAllTeams(formatted);
  };

  const fetchMembers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    const formatted = data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
    setAllMembers(formatted);
  };

  const assignMemberToTeam = (teamId: number, memberId: number) => {
    setAllTeams(prev =>
      prev.map(team =>
        team.id === teamId && !team.assignedMemberIds.includes(memberId)
          ? { ...team, assignedMemberIds: [...team.assignedMemberIds, memberId] }
          : team
      )
    );
  };

  const removeMemberFromTeam = (teamId: number, memberId: number) => {
    setAllTeams(prev =>
      prev.map(team =>
        team.id === teamId
          ? { ...team, assignedMemberIds: team.assignedMemberIds.filter(id => id !== memberId) }
          : team
      )
    );
  };

  // useCallback pour éviter que updatePagination change à chaque rendu
  const updatePagination = useCallback(() => {
    let sorted = [...allTeams];
    if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'assignedCount') {
      sorted.sort((a, b) => b.assignedMemberIds.length - a.assignedMemberIds.length);
    }

    const start = (currentPage - 1) * pageSize;
    const paginated = sorted.slice(start, start + pageSize);
    setPaginatedTeams(paginated);
  }, [allTeams, currentPage, sortBy]);

  // Ajout de updatePagination dans les dépendances
  useEffect(() => {
    updatePagination();
  }, [updatePagination]);

  useEffect(() => {
    fetchTeams();
    fetchMembers();
  }, []);

  const totalPages = Math.ceil(allTeams.length / pageSize);

  return (
    <TeamsContext.Provider
      value={{
        allTeams,
        paginatedTeams,
        allMembers,
        fetchTeams,
        fetchMembers,
        assignMemberToTeam,
        removeMemberFromTeam,
        setSortBy: setSortByState,
        setCurrentPage,
        pageSize,
        totalPages,
        currentPage,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

// Hook custom pour utiliser le contexte plus facilement
export const useTeams = () => useContext(TeamsContext);
