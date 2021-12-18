#include<iostream>
using namespace std;
int main()
{
    int i=99;
    while(i--)
    {
        for(int j=0;j<5;j++)
        {
            for(int k=0;k<=j;k++)
            cout<<"* ";
            cout<<endl;
        }
    }
}