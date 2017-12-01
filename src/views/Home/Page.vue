<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
</style>
<template>
    <div class="layout">
        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <a href="#">Sign up</a> |
                <a href="#">Help Center</a> |
                <a href="#">Security</a> |
                <a href="#">Service</a>
            </div>
        </div>
        <div class="layout-header">
            <div class="layout-logo"></div>
        </div>
        <div style="height: 200px">
 <h2>印象笔记相关</h2>
      <h3>笔记本和标签</h3>
      <p><strong>马克飞象</strong>增加了<code>@(笔记本)[标签A|标签B]</code>语法, 以选择笔记本和添加标签。 <strong>绑定账号后</strong>， 输入<code>(</code>自动会出现笔记本列表，请从中选择。</p>
      <h3>笔记标题</h3>
      <p><strong>马克飞象</strong>会自动使用文档内出现的第一个标题作为笔记标题。例如本文，就是第一行的 <code>欢迎使用马克飞象</code>。</p>
      <h3>快捷编辑</h3>
      <p>保存在印象笔记中的笔记，右上角会有一个红色的编辑按钮，点击后会回到<strong>马克飞象</strong>中打开并编辑该笔记。</p>
      <blockquote>
      <p>**注意：**目前用户在印象笔记中单方面做的任何修改，马克飞象是无法自动感知和更新的。所以请务必回到马克飞象编辑。</p>
      </blockquote>
      <h3>数据同步</h3>
      <p><strong>马克飞象</strong>通过<strong>将Markdown原文以隐藏内容保存在笔记中</strong>的精妙设计，实现了对Markdown的存储和再次编辑。既解决了其他产品只是单向导出HTML的单薄，又规避了服务端存储Markdown带来的隐私安全问题。这样，服务端仅作为对印象笔记 API调用和数据转换之用。</p>
      <blockquote>
      <p><strong>隐私声明：用户所有的笔记数据，均保存在印象笔记中。马克飞象不存储用户的任何笔记数据。</strong></p>
      </blockquote>
      <h3>离线存储</h3>
      <p><strong>马克飞象</strong>使用浏览器离线存储将内容实时保存在本地，不必担心网络断掉或浏览器崩溃。为了节省空间和避免冲突，已同步至印象笔记并且不再修改的笔记将删除部分本地缓存，不过依然可以随时通过<code>文档管理</code>打开。</p>
      <blockquote>
      <p>**注意：**虽然浏览器存储大部分时候都比较可靠，但印象笔记作为专业云存储，更值得信赖。以防万一，<strong>请务必经常及时同步到印象笔记</strong>。</p>
      </blockquote>


        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
