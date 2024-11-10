import { participantsData } from '../data/participants'
import { Stage } from '../types/stages'

export function getParticipantCount(stateName: Stage, country: string) {
  return participantsData.participants.filter(p => 
    String(p.stage) === String(stateName) && p.country === country
  ).length
} 