import React, { useState } from 'react';
import { useTeams } from '../contexts/TeamsContext';
import TeamCard from '../components/TeamCard';
import MemberModal from '../components/MemberModal';
import { Team } from '../types';

const TeamManagementPage: React.FC = () => {
  const {
    paginatedTeams,
    allMembers,
    currentPage,
    totalPages,
    setCurrentPage,
    setSortBy,
    assignMemberToTeam,
  } = useTeams();

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleOpenModal = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleCloseModal = () => {
    setSelectedTeam(null);
  };

  const handleAssignMember = (memberId: number) => {
    if (!selectedTeam) return;
    assignMemberToTeam(selectedTeam.id, memberId);
    handleCloseModal();
  };

  return (
    <div className="container py-5">
      <h1 className="text-primary text-center mb-4 fw-bold">Gestion des Équipes</h1>

      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        <button className="btn btn-outline-primary" onClick={() => setSortBy('title')}>
          Trier par nom
        </button>
        <button className="btn btn-outline-primary" onClick={() => setSortBy('assignedCount')}>
          Trier par nombre de membres
        </button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
        {paginatedTeams.map((team) => (
          <div key={team.id} className="col">
            <TeamCard team={team} allMembers={allMembers} openModal={handleOpenModal} />
          </div>
        ))}
      </div>

      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center gap-3">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Page précédente"
            >
              ← Précédent
            </button>
          </li>
          <li className="page-item disabled align-self-center">
            <span className="page-link border-0 bg-transparent fw-bold">
              {currentPage} / {totalPages}
            </span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Page suivante"
            >
              Suivant →
            </button>
          </li>
        </ul>
      </nav>

      {selectedTeam && (
        <MemberModal
          team={selectedTeam}
          allMembers={allMembers}
          closeModal={handleCloseModal}
          assignMember={handleAssignMember}
        />
      )}
    </div>
  );
};

export default TeamManagementPage;
