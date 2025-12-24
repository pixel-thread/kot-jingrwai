export interface EasBuildPayload {
  id: string;
  accountName: string;
  projectName: string;
  buildDetailsPageUrl: string;
  parentBuildId?: string | null;
  appId: string;
  initiatingUserId: string;
  cancelingUserId?: string | null;
  platform: "android" | "ios";
  status: "errored" | "finished" | "canceled";
  artifacts: EasBuildArtifacts;
  metadata: EasBuildMetadata;
  metrics: EasBuildMetrics;
  error?: EasBuildError | null;
  createdAt: string;
  enqueuedAt: string;
  provisioningStartedAt?: string | null;
  workerStartedAt?: string | null;
  completedAt?: string | null;
  updatedAt: string;
  expirationDate?: string | null;
  priority: "high" | "normal" | "low";
  resourceClass: string;
  actualResourceClass: string;
  maxRetryTimeMinutes?: number;
}

export interface EasBuildArtifacts {
  buildUrl?: string | null;
  logsS3KeyPrefix: string;
}

export interface EasBuildMetadata {
  appName: string;
  username: string;
  workflow: string;
  appVersion: string;
  appBuildVersion: string;
  cliVersion: string;
  sdkVersion: string;
  buildProfile: string;
  distribution: string;
  appIdentifier: string;
  gitCommitHash: string;
  gitCommitMessage: string;
  runtimeVersion: string;
  channel?: string | null;
  releaseChannel?: string | null;
  reactNativeVersion: string;
  trackingContext: EasTrackingContext;
  credentialsSource: string;
  isGitWorkingTreeDirty: boolean;
  message?: string | null;
  runFromCI: boolean;
}

export interface EasTrackingContext {
  platform: string;
  account_id: string;
  dev_client: boolean;
  project_id: string;
  tracking_id: string;
  project_type: string;
  dev_client_version?: string | null;
}

export interface EasBuildMetrics {
  memory: number;
  buildEndTimestamp: number;
  totalDiskReadBytes: number;
  buildStartTimestamp: number;
  totalDiskWriteBytes: number;
  cpuActiveMilliseconds: number;
  buildEnqueuedTimestamp: number;
  totalNetworkEgressBytes: number;
  totalNetworkIngressBytes: number;
}

export interface EasBuildError {
  message: string;
  errorCode: string;
}
