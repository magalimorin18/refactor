import { Invoice, Plays, Performance, Play } from "./interface";
import { invoice, plays } from "./variables";

function amountFor(aPerformance: Performance) {
  let result = 0;
  switch (playFor(aPerformance).type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}

function playFor(aPerformance: Performance): Play {
  // @ts-ignore
  return plays[aPerformance.playID];
}

function volumeCreditFor(aPerformance: Performance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ("comedy" === playFor(aPerformance).type)
    result += Math.floor(aPerformance.audience / 5);

  return result;
}

function usd(aNumber: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditFor(perf);
  }

  return volumeCredits;
}

function totalAmount() {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    totalAmount += amountFor(perf);
  }

  return totalAmount;
}

export function statement(invoice: Invoice, plays: Plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  console.log(result);
}

statement(invoice, plays);
