import React, { useState } from 'react';
import { Team, Member } from '../types';

interface MemberModalProps {
  team: Team;
  allMembers: Member[];
  closeModal: () => void;
  assignMember: (memberId: number) => void;
}

const MemberModal: React.FC<MemberModalProps> = ({
  team,
  allMembers,
  closeModal,
  assignMember,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  // Membres non encore assignés à cette équipe
  const availableMembers = allMembers.filter(
    (m) => !team.assignedMemberIds.includes(m.id)
  );

  const handleAssignClick = () => {
    if (selectedMemberId !== null) {
      assignMember(selectedMemberId);
    }
  };

  return (
    <>
      <div
        className="modal show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="memberModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title" id="memberModalLabel">
                Affecter un membre à l'équipe "{team.title}"
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Fermer"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              {availableMembers.length === 0 ? (
                <p className="text-muted">Tous les membres sont déjà assignés.</p>
              ) : (
                <select
                  className="form-select"
                  value={selectedMemberId ?? ''}
                  onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                  aria-label="Sélectionner un membre"
                >
                  <option value="" disabled>
                    -- Sélectionnez un membre --
                  </option>
                  {availableMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={selectedMemberId === null}
                onClick={handleAssignClick}
              >
                Affecter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fond sombre semi-transparent */}
      <div
        className="modal-backdrop fade show"
        onClick={closeModal}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};

export default MemberModal;
