<template>
    <div class="progress-background">
        <div class="progress-value"></div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        progress: Int16Array
    }
}
</script>

<style>
.progress-background {
    border-radius: 10px;
    background-color: rgb(209, 209, 209);
    height: 16px;
}

.progress-value {
    border-radius: 10px;
    background-color: rgb(25, 144, 248);
    height: 16px;
    width: 30%;
}
</style>