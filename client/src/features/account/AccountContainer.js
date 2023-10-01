import AccountView from "./AccountView";
import { useGetMyProjectsQuery, useGetOtherProjectsQuery } from "../api/apiSlice";
import { useState } from "react";

export function AccountContainer() {
    const { data: myProjectsData, error: myProjectsError, isSuccess: myProjectsIsSuccess, isLoading: myProjectsIsloading } = useGetMyProjectsQuery();
    const {data: otheProjectsData , error: otherProjectsError, isSuccess: otherProjectsIsSuccess,  isLoading: otherProjectsIsLoading} = useGetOtherProjectsQuery();
    
    const [requests, setRequests] = useState([]);
    const [type, setType] = useState("default");
    
    if (myProjectsIsloading || otherProjectsIsLoading) {
      return <div>Loading requests...</div>;
    }
    
    if (myProjectsError || otherProjectsError) {
      return <div>Error: {otherProjectsError.message ?? myProjectsError.message} </div>;
    }
     
    const handleOtherRequests = async () => {
      setRequests(otheProjectsData);
      setType("other");
    }

    const handleMyRequests = async () => {
      setRequests(myProjectsData);
      setType("mine");
    }
     
    if(myProjectsIsSuccess && otherProjectsIsSuccess){
      return (
        <AccountView requests={requests} otherHandler={handleOtherRequests} mineHandler={handleMyRequests} type={type}/>
      );
    }
}