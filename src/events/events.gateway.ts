import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SubmissionService } from '../practice/service/SubmissionService';
import { AnswerRequestDto } from '../practice/controller/dto/request/AnswerRequestDto';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, Socket>;
  constructor(private readonly submissionService: SubmissionService) {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

  //소켓 연결시 오브젝트에 저장
  public handleConnection(client: Socket): void {
    console.log('connected', client.id);
    this.client[client.id] = client;
  }

  //소켓 연결 해제시 오브젝트에서 제거
  public handleDisconnect(client: Socket): void {
    console.log('disonnected', client.id);
    delete this.client[client.id];
  }

  @SubscribeMessage('submit')
  async submitAnswer(client: Socket, payload: AnswerRequestDto): Promise<void> {
    const response = await this.submissionService.createAndModify(payload);
    this.server.emit('submit', response);
  }
}
