<script>
	export let title = "Default Title";
</script>

<section class="content">
	<h2>{title}</h2>
    <slot />
</section>

<style>
	.content {
	  background: white;
	  padding: 1rem;
      padding-top: 0rem;
	  border-radius: 16px;
	  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
	}
  
	.content h2 {
	  margin-top: 1rem;
	  font-size: 1.5rem;
	  color: #333;
	}
</style>