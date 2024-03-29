export class Task {
    taskName?: string;
    taskDate?: number;
    taskDay?: string;
    taskDetails?: string;
    partnerName?: string;
    partnerNumber?: string; 
    partnerMail?: string;
    isTerminated?: boolean;
    taskCycles?: number;
    taskCyclesDone?: number;
    isInvited?: boolean;
    isInvitational?: boolean;
    taskUniqueId?: number;
    partners?: Partner[];
}

export class Partner {
    partnerName?: string;
    partnerNumber?: string;
    partnerMail?: string;
    isInvited?: boolean;
}
