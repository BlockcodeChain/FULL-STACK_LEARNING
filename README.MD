…or create a new repository on the command line
echo "# FULL-STACK_LEARNING" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M newbranch
git remote add origin https://github.com/BlockcodeChain/FULL-STACK_LEARNING.git
git push -u origin newbranch
…or push an existing repository from the command line
git remote add origin https://github.com/BlockcodeChain/FULL-STACK_LEARNING.git
git branch -M newbranch
git push -u origin newbranch