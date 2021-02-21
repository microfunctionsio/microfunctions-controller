import {Controller, Get} from '@nestjs/common';
import {HealthCheck, HealthCheckService, MicroserviceHealthIndicator} from '@nestjs/terminus';
import {RmqOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private microservice: MicroserviceHealthIndicator,
        private configService: ConfigService,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        const guestUrl = [`amqp://${this.configService.get('RABBIT_USER')}:${this.configService.get('RABBITMQ_PASSWORD')}@${this.configService.get('RABBIT_HOST')}:5672`];

        return this.health.check([
            async () =>
                this.microservice.pingCheck<RmqOptions>('rabbitmq', {
                    transport: Transport.RMQ,
                    options: {
                        urls: guestUrl,
                        queueOptions: {
                            durable: false,
                        },
                    },
                }),
        ]);
    }
}
