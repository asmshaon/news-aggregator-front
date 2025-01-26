"use client";

import React, { Suspense, useState, useEffect } from "react";

const fetchJokes = async () => {
  const res = await fetch("https://api.chucknorris.io/jokes/random", {
    headers: {
      Accept: "application/json",
    },
  });

  return res.json();
};

const JokeItem = () => {
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState({ value: "dd" });

  const fetch = async () => {
    setLoading(true);
    setJoke(await fetchJokes());
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const changeJoke = async () => {
    fetch();
  };

  return (
    <>
      <h1 className="font-bold text-red-700 py-3">{joke.value}</h1>
      <button
        disabled={loading}
        onClick={changeJoke}
        className="btn btn-primary border pl-3 pr-3 mt-2 btn border-t-red-100 bg-green-500 rounded"
      >
        {!loading ? `Load new Joke - News Aggregator!` : "Loading..."}
      </button>
    </>
  );
};

export default function JokePage() {
  return (
    <div>
      <h2 className="font-bold">Chuck Norris Joke</h2>
      <Suspense fallback={<h1>Loading</h1>}>
        <JokeItem />
      </Suspense>
    </div>
  );
}
