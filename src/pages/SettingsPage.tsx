const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground mt-1">User management, integrations & permissions</p>

      <div className="mt-6 bg-card border border-border rounded-lg p-5">
        <p className="text-sm text-muted-foreground">
          Configure integrations (Google Drive, ClickUp, Sheets), manage users and roles.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
