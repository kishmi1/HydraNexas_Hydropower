"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import IconButton from "./IconButton";

export default function DeleteButton({ 
  id, 
  endpoint, 
  itemName = "item",
  onSuccess = null,
  redirectPath = null 
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert(`${itemName} deleted successfully`);
        if (onSuccess) {
          onSuccess();
        } else if (redirectPath) {
          window.location.href = redirectPath;
        } else {
          window.location.reload();
        }
      } else {
        alert(data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <IconButton
        icon={Trash2}
        variant={showConfirm ? "danger" : "delete"}
        tooltip={showConfirm ? "Confirm delete" : "Delete"}
        onClick={handleDelete}
        disabled={isDeleting}
        className={showConfirm ? "animate-pulse" : ""}
      />
    </>
  );
}