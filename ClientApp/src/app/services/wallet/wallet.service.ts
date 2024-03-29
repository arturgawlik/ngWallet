import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../http/applicationHttpClientService.service';
import { Observable, of } from 'rxjs';
import { Wallet } from './models/wallet.model';
import { WalletChartResult } from './models/walletChartResult.model';
import { WalletChangeSave } from './models/walletChangeSave.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    constructor(private http: ApplicationHttpClient) {
    }

    saveChange(data: WalletChangeSave) {
        return this.http.post('walletChange/save', data);
    }

    getWalletsIds(): Observable<number[]> {
        return this.http.get<number[]>('wallet/getAllIds');
    }

    fetchAll(): Observable<Wallet[]> {
        return this.http.get<Wallet[]>('wallet/getAll');
    }

    getWallet(id: number): Observable<Wallet> {
        return this.http.get<Wallet>(`wallet/getWithChanges/${id}`);
    }

    getWalletChart(id: number): Observable<WalletChartResult> {
        return this.http.get<any>(`wallet/primaryChart/${id}`).pipe(
            map(res => {
                return {
                    data: {
                        labels: [1, '', '', '', '', '', '', '', '',
                                10, '', '', '', '', '', '', '', '', '',
                                20, '', '', '', '', '', '', '', '', '',
                                30, ''],
                        datasets: res,
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Wallet history',
                            fontSize: 16
                        },
                        legend: {
                            postition: 'bottom'
                        }
                    }
                };
            })
        );
    }

    save(wallet: Wallet): Observable<any> {
        return this.http.post('/wallet/save', wallet);
    }

    removeChange(id: number) {
        return this.http.delete(`walletChange/remove/${id}`);
    }

}
