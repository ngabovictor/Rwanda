import { useMemo, useState, useEffect } from "react";

const useParse = ({
  province,
  district,
  sector,
  cell,
}: {
  province: string;
  district: string;
  sector: string;
  cell: string;
}) => {
  const [locations, setlocations] = useState<any>();
  const [loading, setloading] = useState(true);

  const fetchLocations = async () => {
    setloading(true);
    const res = await fetch("/data.json");
    const data = await res.json();
    setlocations(data);
    setloading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const getProvinces = () => {
    return Object.keys(locations);
  };

  const getDistricts = (province: string) => {
    try {
      const data = locations[province];
      return Object.keys(data);
    } catch (error) {
      return [];
    }
  };

  const getSectors = (province: string, district: string) => {
    try {
      const data = locations[province][district];
      return Object.keys(data);
    } catch (error) {
      return [];
    }
  };

  const getCells = (province: string, district: string, sector: string) => {
    try {
      const data = locations[province][district][sector];
      return Object.keys(data);
    } catch (error) {
      return [];
    }
  };

  const getVillages = (
    province: string,
    district: string,
    sector: string,
    cell: string
  ) => {
    try {
      const data = locations[province][district][sector][cell];
      return data;
    } catch (error) {
      return [];
    }
  };

  const values = useMemo(
    () =>
      locations
        ? {
            loading,
            provinces: getProvinces() || [],
            districts: getDistricts(province) || [],
            sectors: getSectors(province, district) || [],
            cells: getCells(province, district, sector) || [],
            villages: getVillages(province, district, sector, cell) || [],
          }
        : {
            provinces: [],
            districts: [],
            sectors: [],
            cells: [],
            villages: [],
            loading,
          },
    [province, district, sector, cell, locations]
  );
  return values;
};

export default useParse;
