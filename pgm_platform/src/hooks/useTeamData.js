import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_TEAM } from '../queries/teamQueries';

export default function useTeamData() {
    const { data, isLoading, error } = useQuery(GET_TEAM);;
    // console.log("team:", data);
  return {
    data: data ? data.instructeurs : [],
    isLoading: isLoading,
    error: error
  }
}
