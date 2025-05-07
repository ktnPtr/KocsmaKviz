<script>
// @ts-nocheck
  export let id = 0;
  export let title = "Card Title";
  export let date = "This is the card description.";
  export let onClick = (id) => {};
</script>

<div class="card">
  <h3 class="title">
    {title}
  </h3>
  <p class="date">
    {date}
  </p>
  <button class="register" on:click={() => onClick(id)}>
    Register
  </button>
</div>

<style>
  .card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .title {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #2c2c2e;
  }

  .date {
      margin: 0 0 1rem;
      color: #555;
      flex: 1;
    }

  .register {
      align-self: flex-start;
      background-color: #28a745;
      color: white;
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
  
    .register:hover {
      background-color: #218838;
    }
</style>