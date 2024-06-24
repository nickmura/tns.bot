/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTonWallet } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDomainInfo } from "../../slices/SearchDomain";
import type { RootState } from "../../store";
import AdditionalDomainRow from "./components/AdditionalDomainRow/AdditionalDomainRow";
import BidStatusRow from "./components/BidStatusRow/BidStatusRow";
import SearchDomainHeader from "./components/SearchDomainHeader/SearchDomainHeader";
import styles from "./SearchDomain.module.css";


export default function SearchDomain() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const tempDomainInfo = useSelector((state: RootState) => state.searchDomain.domainInfo)
	const tempDomainBids = useSelector((state: RootState) => state.searchDomain.domainBids)
	const tempAdditionalDomains = useSelector((state: RootState) => state.searchDomain.additionalDomains)

	const [domainInfo, setDomainInfo] = useState<any[]>([]);
	const [domainBids, setDomainBids] = useState<any[]>(tempDomainBids);
	const [additionalDomains, setAdditionalDomains] = useState<any[]>(tempAdditionalDomains);

	const state = useSelector((state: RootState) => state.searchDomain)

	useEffect(() => {
		dispatch(fetchDomainInfo(id))
	}, [id])

	useEffect(() => {
		const datas = [tempDomainInfo]
		setDomainInfo(datas)
		setDomainBids(tempDomainBids)
		setAdditionalDomains(tempAdditionalDomains)
		console.log(domainInfo, )
	}, [tempDomainInfo, tempDomainBids, tempAdditionalDomains])


	return (
		<>
			{
				domainInfo?.map((data, index) => {
					return (
						<SearchDomainHeader 
							 data={data}
						/>
					)
				})
			}
			<div className={styles.tableContainer}>
				<label>Header</label>
				<div className={styles.tableWrapper}>
					<table className={styles.table}>
						<thead className={styles.thead}>
							<tr>
								<th className={styles.th}>Bidder</th>
								<th className={styles.th}>Amount</th>
								<th className={styles.th}>Date</th>
							</tr>
						</thead>
						<tbody className={styles.tbody}>
							{
								domainBids?.data?.map((e, i) => {
									return (
										<BidStatusRow
											item={e}
											index={i}
											key={i}
										/>
									);
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<label>Header</label>
				<div className={styles.tableWrapper}>
					<table className={styles.table}>
						<thead className={styles.thead}>
							<tr>
								<th className={styles.th}>Additional domains holder owns</th>
							</tr>
						</thead>
						<tbody className={styles.tbody}>
							{
								additionalDomains?.items?.map((e, i) => {
								    return (
								        <AdditionalDomainRow
								            item={e.name}
								            index={i}
								            key={i}
								        />
								    );
								})
              }
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
