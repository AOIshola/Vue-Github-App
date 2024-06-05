<script setup>
defineProps({
  totalPages: {
    type: Number,
    required: true,
    default: 0
  }
});

// const pageNumbersRef = reactive({
//     numbers
// })

const range = (start, end) => {
    let pageNumbers = []

    if (!end) {
        end = start;
        start = 0;
    };
    for (let i = start; i < end; i += 1) {
    pageNumbers.push(i);
  }
//   pageNumbersRef.numbers = pageNumbers
  return pageNumbers;
}
</script>

<template>
    <div>
        <ul>
        <li v-for="page in range(1, Math.ceil(totalPages / 10) + 1)" :key="page">
          <button @click="$emit('getRepos', page)">{{ page }}</button>
        </li>
      </ul>
    </div>
</template>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    gap: 10;
}
li {
    list-style: none;
}

button {
    background-color: #1e293b;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    border: none;
    padding: 5px;
    margin: 0px 10px;
    width: 50px;
}
</style>