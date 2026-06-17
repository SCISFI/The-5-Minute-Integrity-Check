import { CrisisData } from "../types";

const HIGH_RISK = ['Hurt myself', 'Use again'];

export const hasHighRisk = (data: CrisisData): boolean =>
  data.tempted.some(t => HIGH_RISK.includes(t));

const riskPattern = (tempted: string[]): string => {
  if (tempted.includes('Contact the other person')) return 'to reach back out to the other person';
  if (tempted.includes('Delete or hide more information')) return 'to hide or delete more';
  if (tempted.includes('Blame her reaction')) return 'to blame her reaction';
  if (tempted.includes('Minimize it')) return 'to minimize what happened';
  if (tempted.includes('Defend myself') || tempted.includes('Explain why it happened')) return 'to explain and defend yourself';
  if (tempted.includes('Promise it will never happen again')) return 'to make a promise you have not yet earned';
  if (tempted.includes('Demand reassurance')) return 'to demand reassurance';
  if (tempted.includes('Shut down or disappear')) return 'to shut down and disappear';
  return 'to manage how this looks';
};

export const getStabilizingMemo = (data: CrisisData): string => {
  if (hasHighRisk(data)) {
    return "Your safety matters more than finishing this check. If you might harm yourself or someone else, or if anyone is in immediate danger, contact emergency services or a crisis line now. You do not have to stay alone with this. Before anything else, reach one real person today — a crisis line, a counselor, or someone you trust.";
  }

  const desc = data.honestDescription.trim();
  const factual = desc
    ? `You named it plainly: "${desc}." Saying it without spin is the first real step.`
    : `You have begun to name what happened instead of hiding it. That honesty is the first real step.`;

  const pull = `Right now the strongest pull is ${riskPattern(data.tempted)}. That instinct is human — and acting on it would only deepen the harm.`;

  const action = data.nextAction[0]
    ? `Your next honest action is clear: ${data.nextAction[0].charAt(0).toLowerCase()}${data.nextAction[0].slice(1)}. Do that one thing.`
    : `Choose one honest action and do only that — stop arguing, and give her space.`;

  const responsibility = `The work of the next 24 hours is not to repair your image. It is to stop adding to the damage. Do not pressure her to forgive you, calm down, or carry your emotions. Give her space, and bring a real person — a counselor, mentor, or sponsor — into this with you today.`;

  const close = `You don't need another promise. You need structure. The first faithful step is not to defend yourself — it is to come into the light.`;

  return `${factual} ${pull} ${action} ${responsibility} ${close}`;
};
