import React, { useContext } from 'react';
import { TeamsContext } from '../contexts/TeamsContext';
import TeamCard from '../components/TeamCard';

// Bootstrap classes sont utilisées ici, tu dois importer Bootstrap dans ton projet (via index.html ou npm)
const TeamsDashboard = () => {
  const {
    paginatedTeams,
    allMembers,
    currentPage,
    totalPages,
    setCurrentPage,
    setSortBy,
  } = useContext(TeamsContext);

  return (
    <div className="container py-5">
      <h1 className="text-primary text-center mb-4 fw-bold">Dashboard des Équipes</h1>

      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        <button
          className="btn btn-outline-primary"
          onClick={() => setSortBy('title')}
        >
          Trier par nom
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setSortBy('assignedCount')}
        >
          Trier par membres
        </button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
        {paginatedTeams.map((team) => (
          <div key={team.id} className="col">
            <TeamCard team={team} allMembers={allMembers} />
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
    </div>
  );
};

export default TeamsDashboard;