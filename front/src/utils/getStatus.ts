  
    function toDay(date: Date | string): Date {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
  
  export function getStatus(
    startString: string,
    endString: string | undefined,
  ): string {
    const now = toDay(new Date());
    const start = toDay(startString);
    const end = toDay(endString!);

    if (now < start) return "future";
    else if (now > end) return "past";
    else return "ongoing";
  }