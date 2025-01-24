<template>
    <div class="table-container">
      <table class="simple-table">
        <thead>
          <tr>
            <th>Ime i prezime</th>
            <th>Email</th>
            <th>Odjel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agent in agents" :key="agent.id">
            <td>{{ agent.name }}</td>
            <td>{{ agent.contact }}</td>
            <td>{{ agent.field }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AgentTable",
    data() {
      return {
        agents: [],
      };
    },
    async created() {
      await this.fetchAgents();
    },
    methods: {
      async fetchAgents() {
        try {
          const response = await axios.get("http://localhost:8000/agents");
          this.agents = response.data;
        } catch (error) {
          console.error("Error fetching agents:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .simple-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .simple-table th,
  .simple-table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
    color: black;
  }
  
  .simple-table th {
    background-color: #ffffff;
    color: #b81c65;
    font-weight: 600;
  }
  
  .simple-table tr:nth-child(even) {
    background-color: #ffffff;
  }
  </style>
  