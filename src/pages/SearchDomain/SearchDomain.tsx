// "use client";

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
import { AppDispatch } from "../../store";

export default function SearchDomain() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const tempDomainInfo = useSelector((state: RootState) => state.searchDomain.domainInfo)
	const tempDomainBids = useSelector((state: RootState) => state.searchDomain.domainBids)
	const tempAdditionalDomains = useSelector((state: RootState) => state.searchDomain.additionalDomains)
	const state = useSelector((state: RootState) => state.searchDomain)
	const [domainInfo, setDomainInfo] = useState<any[]>([]);
	const [domainBids, setDomainBids] = useState<any[]>(tempDomainBids);
	const [additionalDomains, setAdditionalDomains] = useState<any[]>(tempAdditionalDomains);
	const searchId = id?.split(".ton")[0] //@ts-ignore
	// console.log(state)
	useEffect(() => {
		if (searchId) {  //@ts-ignore
			dispatch(fetchDomainInfo(searchId))
		}
	}, [searchId])

	useEffect(() => {
		const datas = [tempDomainInfo]
		setDomainInfo(datas)
		setDomainBids(tempDomainBids)
		setAdditionalDomains(tempAdditionalDomains)
	}, [tempDomainInfo, tempDomainBids, tempAdditionalDomains])


	return (
		<>
			{
				domainInfo?.map((data) => {
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
								(domainBids as { data?: any[] })?.data?.map((e: object, i: number) => {
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
								(additionalDomains as { items?: any[] })?.items?.map((e: object, j: number) => {
									return (
										<AdditionalDomainRow
											item={e}
											index={j}
											key={j}
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
