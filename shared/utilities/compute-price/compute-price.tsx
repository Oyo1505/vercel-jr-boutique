export default function computePrice(nombre:number):number {
  if(!nombre) return 0
  return Math.round(nombre * 100) / 100;
}