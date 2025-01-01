import TeamMembersListView from "./teamMembersListView";
import { React, useState } from 'react';

export const TeamMembersListContainer = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMember) {
      props.onDeleteMember(selectedMember.id);
    }
    setShowConfirmModal(false);
    setSelectedMember(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedMember(null);
  };

  return (
    <TeamMembersListView
      members={props.members}
      onDeleteClick={handleDeleteClick}
      type={props.type}
      isOwner={props.isOwner}
      showConfirmModal={showConfirmModal}
      selectedMember={selectedMember}
      onConfirmDelete={handleConfirmDelete}
      onCancelDelete={handleCancelDelete}
    />
  );
};