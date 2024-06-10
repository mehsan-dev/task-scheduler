export class Task {
  constructor(
    public readonly taskName: string,
    public readonly description: string,
    public readonly type: string,
    public readonly minute: number,
    public readonly id?: number
  ) {}
}
