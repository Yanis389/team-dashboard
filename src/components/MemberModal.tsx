import React, { useState } from 'react';
import { Team } from '../types';
import { useTeams } from '../contexts/TeamsContext';
import './MemberModal.css';

interface MemberModalProps {
  team: Team;
  closeModal: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ team, closeModal }) => {
  const { allMembers, assignMemberToTeam, removeMemberFromTeam } = useTeams();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const isMemberAssigned = (memberId: number) =>
    team.assignedMemberIds.includes(memberId);

  const handleAssign = async (memberId: number) => {
    setLoadingId(memberId);
    await assignMemberToTeam(team.id, memberId);
    setLoadingId(null);
  };

  const handleRemove = async (memberId: number) => {
    setLoadingId(memberId);
    await removeMemberFromTeam(team.id, memberId);
    setLoadingId(null);
  };

  return (
    <div className="member-modal__overlay">
      <div className="member-modal__container shadow-lg bg-white p-4 rounded">
        <h3 className="member-modal__title text-primary mb-4">
          Gérer les membres pour <span className="text-dark">{team.title}</span>
        </h3>

        {allMembers.length === 0 ? (
          <p className="text-muted fst-italic">Aucun membre disponible</p>
        ) : (
          <ul className="list-group mb-4">
            {allMembers.map((member) => {
              const assigned = isMemberAssigned(member.id);
              return (
                <li
                  key={member.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    assigned ? 'bg-light' : ''
                  }`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                      style={{ width: 36, height: 36, fontWeight: 700 }}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-bold">{member.name}</div>
                      <small className="text-muted">{member.email}</small>
                    </div>
                  </div>

                  {assigned ? (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(member.id)}
                      disabled={loadingId === member.id}
                    >
                      {loadingId === member.id ? '...' : 'Désassigner'}
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleAssign(member.id)}
                      disabled={loadingId === member.id}
                    >
                      {loadingId === member.id ? '...' : 'Assigner'}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="text-end">
          <button className="btn btn-secondary" onClick={closeModal}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
