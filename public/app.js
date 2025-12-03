function confirmDelete(event) {
  if (!confirm("Do you really want to delete this chat?")) {
    event.preventDefault(); // stop delete if cancelled
  }
}

