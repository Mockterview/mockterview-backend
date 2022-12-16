export class WantResponseDto {
  readonly pageName: string;
  readonly wantCount: number;

  constructor(pageName: string, wantCount: number) {
    this.pageName = pageName;
    this.wantCount = wantCount;
  }
}
