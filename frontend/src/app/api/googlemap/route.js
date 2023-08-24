/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  console.log(origin, destination);
  const apiKey = "AIzaSyAHYaFCuCUnP0k_7vGsa0u4dNuS02_GwoU";
  const originPlace = encodeURIComponent(origin);
  const destinationPlace = encodeURIComponent(destination);
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originPlace}&destination=${destinationPlace}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    const { data } = response;
    console.log(data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}
