import { VEChoice } from '../core/models/VEChoice';
import { Reason } from '../core/models/Reason';
import { RootCause } from '../core/models/RootCause';
import { Risk } from '../core/models/Risk';
import { Type } from '../core/models/Type';
import { Finding } from '../core/models/Finding';

export const dummyVEChoices: VEChoice[] = [
  { id: 1, veChoice: 'Positive' },
  { id: 2, veChoice: 'Reactive' }
];

export const dummyReasons: Reason[] = [
  { id: 1, reason: 'Employee not following safe system of works.' },
  { id: 2, reason: 'Housekeeping issues identified in the workshop area.' },
  { id: 3, reason: 'Improper use of personal protective equipment observed.' },
  { id: 4, reason: 'Near miss incident where a worker almost slipped on wet floor.' },
  { id: 5, reason: 'Worker struck by falling tool during operation.' },
  { id: 6, reason: 'Employee reported unsafe conditions in the working environment.' },
  { id: 7, reason: 'Reactive behavior noted during safety inspection.' }
];

export const dummyRootCauses: RootCause[] = [
  { id: 1, rootCause: 'Behaviour' },
  { id: 2, rootCause: 'Environmental' },
  { id: 3, rootCause: 'Organisation' },
  { id: 4, rootCause: 'Process or Systems' },
  { id: 5, rootCause: 'Training or Competency' }
];

export const dummyRisks: Risk[] = [
  { id: 1, risk: 'Viral Infection' },
  { id: 2, risk: 'Musculoskeletal Disorder' },
  { id: 3, risk: 'Fire or Explosion' },
  { id: 4, risk: 'Fall from Height' },
  { id: 5, risk: 'Exposure to Hazardous Substances' },
  { id: 6, risk: 'Burns or Scalds' },
  { id: 7, risk: 'Drowning' },
  { id: 8, risk: 'Poisoning or Suffocation' },
  { id: 9, risk: 'Strike by Object' },
  { id: 10, risk: 'Other' },
  { id: 11, risk: 'N/A' }
];

export const dummyTypes: Type[] = [
  { id: 1, type: 'SI' },
  { id: 2, type: 'Hazard' },
  { id: 3, type: 'Near Miss' }
];

export const dummyFindings: Finding[] = [
  {
    id: 1,
    finding: 'Improper use of personal protective equipment observed.',
    reasonId: 3,
    rootCauseId: 5,
    veChoiceId: 2,
    riskId: 7,
    typeId: 2
  },
  {
    id: 2,
    finding: 'Employee not following safe system of works.',
    reasonId: 1,
    rootCauseId: 4,
    veChoiceId: 1,
    riskId: 4,
    typeId: 2
  },
  {
    id: 3,
    finding: 'Near miss incident where a worker almost slipped on wet floor.',
    reasonId: 4,
    rootCauseId: 2,
    veChoiceId: 2,
    riskId: 9,
    typeId: 3
  },
  {
    id: 4,
    finding: 'Reactive behavior noted during safety inspection.',
    reasonId: 7,
    rootCauseId: 1,
    veChoiceId: 2,
    riskId: 7,
    typeId: 1
  },
  {
    id: 5,
    finding: 'Housekeeping issues identified in the workshop area.',
    reasonId: 2,
    rootCauseId: 2,
    veChoiceId: 2,
    riskId: 10,
    typeId: 2
  },
  {
    id: 6,
    finding: 'Worker struck by falling tool during operation.',
    reasonId: 5,
    rootCauseId: 3,
    veChoiceId: 2,
    riskId: 10,
    typeId: 2
  },
  {
    id: 7,
    finding: 'Employee reported unsafe conditions in the working environment.',
    reasonId: 6,
    rootCauseId: 4,
    veChoiceId: 1,
    riskId: 8,
    typeId: 2
  },
  {
    id: 8,
    finding: 'Near miss where a worker narrowly avoided being hit by a moving vehicle.',
    reasonId: 7,
    rootCauseId: 1,
    veChoiceId: 2,
    riskId: 9,
    typeId: 3
  },
  {
    id: 9,
    finding: 'Improper handling of electrical equipment detected.',
    reasonId: 3,
    rootCauseId: 5,
    veChoiceId: 2,
    riskId: 2,
    typeId: 2
  },
  {
    id: 10,
    finding: 'Positive attitude towards safety inspection observed.',
    reasonId: 7,
    rootCauseId: 1,
    veChoiceId: 1,
    riskId: 7,
    typeId: 1
  }
];