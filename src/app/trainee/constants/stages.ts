export const STAGE_MAPPING = {
  1: {
    number: 'Stage 1',
    status: 'OnProgress',
    label: 'OnProgress'
  },
  2: {
    number: 'Stage 2',
    status: 'Training',
    label: 'Training'
  },
  3: {
    number: 'Stage 3',
    status: 'Onboarded',
    label: 'Onboarded'
  },
  4: {
    number: 'Stage 4',
    status: 'Completed',
    label: 'Completed'
  }
} as const

export type StageStatus = 'OnProgress' | 'Training' | 'Onboarded' | 'Completed'