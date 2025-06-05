import React from 'react';
import { Team, Member } from '../types';

interface TeamCardProps {
  team: Team;
  allMembers: Member[];
}

const TeamCard: React.FC<TeamCardProps> = ({ team, allMembers }) => {
  const assignedMembers = allMembers.filter(member =>
    team.assignedMemberIds.includes(member.id)
  );

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h3 className="card-title text-primary">{team.title}</h3>
        <p className="card-text text-secondary">{team.body}</p>

        <strong className="d-block mb-2 text-info">Membres assignés :</strong>

        {assignedMembers.length > 0 ? (
          <ul className="list-group list-group-flush">
            {assignedMembers.map(member => (
              <li
                key={member.id}
                className="list-group-item d-flex align-items-center gap-3"
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{ width: 32, height: 32, fontWeight: '700', userSelect: 'none' }}
                  title={member.name}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="fw-semibold text-primary">{member.name}</div>
                  <small className="text-muted">({member.email})</small>
                </div>
                <span className="badge bg-success ms-auto">✔️</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="fst-italic text-muted">Aucun membre assigné</p>
        )}
      </div>
    </div>
  );
};

export default TeamCard;