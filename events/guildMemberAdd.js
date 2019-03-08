module.exports = (bot, member) => {
    console.log(`new ${member} ${member.id} in ${member.guild}`);
    var role = member.guild.roles.find(r => r.name === 'Dieu des hérissons');
    if (member.id == "437973272219484160")
        member.addRole(role, "Auto-Role").catch(console.error);
};