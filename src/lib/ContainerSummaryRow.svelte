<script>
    export let container;
</script>

<div class="row">
    <div class="id">{container.containernumber}</div>
    <div class="shipname">{container.nameofship}</div>
    <div class="date">{container.datecontainershipped}</div>
    <div class="size">{container.containersize}</div>
</div>

<style>
    .row {
        display: flex;
        background-color: #eee;
    }
    .id,
    .shipname,
    .size,
    .date {
        flex: 1 1 0px;
        margin: 10px;
        padding: 20px;
    }
    .id {
        font-weight: bold;
    }
    .size {
        text-align: right;
    }
    .date {
        text-align: center;
    }
    .shipname {
        color: #999;
    }
</style>
