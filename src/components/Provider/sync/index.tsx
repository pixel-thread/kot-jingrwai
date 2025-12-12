import MigrationManager from './MigrationManager';
import { SyncManager } from './SyncManager';

type Props = {
  children: React.ReactNode;
};
export const SyncProvider = ({ children }: Props) => {
  return (
    <MigrationManager>
      <SyncManager>{children}</SyncManager>
    </MigrationManager>
  );
};
